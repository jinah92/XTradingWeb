## 프로젝트 구조

Language: React, Typescript

Build Tool : Vite

Design Tool : chadcn/ui

Node : v20.10.0

npm : 10.2.3

<br>

## 시작 가이드

### Requirements

For building and running the application you need:

- Node.js v22.x.x (작성 시점: v22.13.0)
- pnpm v9.x.x (작성 시점: v9.15.4)
- corepack 활성화 되지 않은 경우 활성화 필요
  `bash
    corepack enable
    `
  <br>

### Installation

```git
git clone https://github.com/MinHyun-code/TradingWeb.git
```

<br>

### Running

```cmd
cd TradingWeb

nvm use 20.10.0

npm install

npm run dev
```

<br>

**- 환경변수 파일은 git ignore하여 따로 파일 추가 필요**

## Git Convention

### branch

| Branch Type  | Description                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| main         | 가장 최신의 production 배포 코드                                                                                                                                              |
| develop      | 개발 시작 시 develop branch에서 checkout, 개발 완료된 feature는 develop branch로 PR (자동배포 환경, 개발 Client + 개발 API)                                                   |
| staging      | production 반영 전 production 환경에서의 테스트 용도 (개발 Client + 운영 API)                                                                                                 |
| release/\*\* | 배포를 위한 테스트 직전 develop에서 checkout 되는 배포용 branch (버전 관리를 해도 되고 스프린트 번호와 맞춰도 좋다)<br />main으로 배포 반영 전 develop, staging에 동기화 필요 |
| feature/\*\* | 작업할 범위의 개발 코드. 모든 상황에서 develop branch로만 PR 이후 merge                                                                                                       |
| hotfix/\*\*  | 운영 단계에서 긴급한 오류 발생 시 main branch에서 checkout 하고 develop에 동기화 후 main로 바로 PR 반영해서 오류 해결                                                         |
| bugfix/\*\*  | release 테스트 단계에서 오류 발생 시 release branch에서 checkoout 하고 release branch에 다시 PR 이후 반영                                                                     |

- feature branch에는 Ticket ID를 명시해서 아래와 같이 작성한다.

```bash
// develop
git checkout -b feature/${ticket-id}-${feature-name}
// ex) git checkout -b feature/PWM-521-write-gitflow-readme
```

### commit

| Commit Type | Description                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| feat        | 새로운 기능을 추가하거나 업데이트 등의 Production Code에 영향을 주는 모든 작업 (리팩토링 포함)                     |
| fix         | 버그 수정                                                                                                          |
| chore       | 단순 문서 작성, 파일 혹은 폴더를 단순히 수정하거나 삭제하는 작업 등의 Production Code에 영향을 주지 않는 모든 작업 |
| test        | 테스트 코드 작성                                                                                                   |

<strong>commit message 작성 규칙</strong>

- branch에 Ticket ID에 해당하는 1건의 티켓 작업만 진행한 경우 commit message에 별도의 ID를 추가하지 않음

```bash
git commit -m "feat: Ticker ID 추가하지 않고 커밋 메세지 작성"
```

- Ticket ID의 하위 티켓을 n건 작업한 경우 commit 메시지에 해당 ID 추가

```bash
git commit -m "feat: ${ticket-id} 커밋 메세지 작성 1"
git commit -m "feat: ${ticket-id} 커밋 메세지 작성 2"
```
