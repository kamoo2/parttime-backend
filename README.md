# PARTTIME MANAGEMENT PROJECT

## 6월 4일 (금)

### User

- createAccount
- editProfile
- login
- seeProfile

## 6월 5일 (토)

### User

- total_stores : 해당 유저의 총 가게 수를 return하는 computed field 생성
- 유저의 stores를 seeProfile에서 볼 수 있도록 include . 만약 점점 더 많아질 때를 대비하여 Pagination 구현을 할 예정

### Store

- createStore : Store를 생성할 때 category명과 storePhoto를 같이 업로드 받아서 category는 존재한다면 connect하고 존재하지 않는다면 생성하고 connect , 업로드 받은 file을 S3에 업로드
- deleteStore : Store는 Category와 Employee와 관계를 가진다. Django에서는 삭제시에 자동으로 관계된 모든 객체를 삭제해주지만 Prisma에는 아직 기능이 없으므로 구현해줘야한다. Store 삭제 전에 Employee를 모두 삭제하고 Store 삭제. 삭제 후 Category의 관계 stores가 0개 이면 해당 Category 삭제
- seeAllStores : 모든 가게 Query
- seeStore : 해당 가게 Query
- seeCategories : 모든 Category Query하고 각 Query에 대한 총 store 수를 return
- seeCategory : 해당 Category Query

### Employee

- createEmployee : Employee 생성
- deleteEmployee : Employee 삭제

### Workday

- createWorkday : workday를 년,월,일을 받아서 이를 slug(Unique)로 변환한다. 이때 생성시에 이미 slug가 이미 있따면 그냥 Employee와 연결해주고
  아니라면 Workday를 생성하고 Employee와 연결 해준다. 이 방법은 Store과 Category와는 다른게 Employee가 생성될 때 Workday를 엮어주는게 아닌 출근시에만 connect되어야 하기 때문에 다른 방법을 사용해야 할 것 같다.

#### Workday 문제 발생

하루 일한 시간을 빼먹어서 다시 migrate해줬다. 그런데 원래 해주려고 했던 방법을 사용할 수가없다.
원래는 slug를 unique로 해서 존재하면 그냥 연결해줬었는데 workTime이 추가되면서 이 방법을 사용할수가 없다. 그래서 workTime도 unique로해서 해볼까 했는데 workTime이 unique가 되어버리면 10시간일한 여러개의 workday를 생성할 수가없다. 그래서 그냥 생성해서 연결해줘야 할 것같다.
근데 그렇게 하면 너무많은 데이터가 쌓일거같은데 ?  
아니면 ? WorkTime 이라는 model을 만들어서 시간을 unique로해 같은 방법으로 relation해주는 것은 ?

#### 선택한 방법은 ?

workTime은 많아봤자 1시간에서 12시간이라고 생각한다. 알바니깐
그래서 그냥 createWorkTime이라는 resolvers를 생성해 1~12 workTime을 생성해주고
이를 이용해서 createWorkday에서는 그냥 connect만 해줬다.

## 6월6일 (일) ~ 6월7일 (월)

### 각종 에러를 추가해줬고 CASCADING DELETE를 구현했다. using $transaction

### store를 삭제하거나 category를 수정할때 만약 category에 연결된 store의 개수가 0이 된다면 그 category 삭제 구현

### 문제 발생

employee를 삭제했을 때 workday에 연관된 employees가 존재하지 않을때 workday를 삭제하고자 한다.
이전의 category와 stores의 관계는 1:N이었기에 categoryId를 이용해 구현해줬지만 employee와 workday는 N:N관계이므로
그 방법으로는 구현 불가 어떻게 하면 구현할 수 있을지 생각해보자

### 문제 해결 !

```js
const deleteWorkdays = await client.workday.findMany({
  where: {
    employees: {
      none: {},
    },
  },
  select: {
    id: true,
  },
});

deleteWorkdays.map(async (workday) => {
  await client.workday.delete({
    where: {
      id: workday.id,
    },
  });
});
```

-> none 을 이용해서 employees가 없는 workday를 모두 찾아줬다.

-> deleteWorkdays를 console.log 해보면 [{id:22},{id:23},{id:24}] 이런식으로 나온다.

-> 이 배열을 map으로 돌면서 삭제해줬다.

방법을 찾으려고 공식문서를 뒤지다가 some만 알고있었는데 none이라는 것도 알게 되었다. 굿!
