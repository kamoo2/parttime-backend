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
