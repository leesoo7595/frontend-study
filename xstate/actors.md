- [Actors](https://stately.ai/docs/actors)
- [Actor System](https://stately.ai/docs/system)

# Actors

State machine을 실행하면, actor가 된다: 이벤트를 수신, 전송하고, 동작을 변경할 수 있는 실행 프로세스로, actor 외부에 효과를 발생시킬 수 있다.

state machine에서는 actors는 `invoked` 또는 `spawned` 될 수 있다. actor의 라이프사이클을 제어하는 방법만 다를 뿐 본질적으로는 동일하다.

- `invoked actor`란, 부모머신이 특정 state에 들어갔을 때, invoked되고, 그 state에서 벗어났을 때 멈춘다.
- `spawned actor`란 트랜지션에서 시작되어 `stop(...) action` 으로 중지되거나, 부모머신이 중지될때 멈춘다.

여기서 트랜지션이란 하나의 유한한 state에서 다른 state로 바뀔때를 의미, 이벤트로 인해 트리거된 것을 말한다.

## Actor model

actor model에서 actors는 서로 소통할 수 있는 객체이다. actors는 비동기적으로 메세지를 전달하며 소통하는 독립적인 '살아있는' 앤티티이다. XState에서는 이 메세지들을 events라고 한다.

- actor는 스스로 업데이트할 수 있는 캡슐화된 자체 내부 state가 있다. actor는 수신한 메세지에 대한 응답으로 내부 state를 업데이트할 수 있지만, 다른 엔티티로 인해 업데이트할 수 없다.
- actors는 다른 actors과 이벤트를 송수신하여 소통한다.
- actors는 한번에 하나의 메세지를 진행한다. actor는 event queue 같은 '메일박스'가 내부에 있고, 그로 인해 이벤트들이 시퀀스하게 진행된다.
- actor의 내부 state는 actors 사이에서 공유되지 않는다. actor의 내부 상태를 공유하는 유일한 방법은:
  - 다른 actors에게 이벤트를 보내는 것
  - snapchots을 내보내는 것, 즉 subscribers에게 전송되는 암시적인 이벤트(스냅샷)로 가능하다.
- actors는 새로운 actor를 생성할 수 있다. (invoke/spawn)

## Actor logic

Actor logic은 actor의 논리적인 '모델'을 말한다. actor가 이벤트를 받았을 때 어떻게 동작을 변경하는지 설명한다. actor logic creators를 사용해서 actor logic을 생성할 수 있다.

XState에서는 actor logic은 `ActorLogic` 인터페이스를 구현하는 객체에 의해 정의된다. 해당 인터페이스는 `.transition(...)`, `.getInitialSnapshot()`, `.getPersistedSnapshot()` 등등 같은 메소드를 포함한다. 이 객체는 인터프리터가 actor의 내부 상태를 업데이트하는 방법과 실행할 이펙트가 있는 이벤트를 받았을 때에 알려준다.

## Creating actors

live 인스턴스인 actor를 생성하는 것은 `createActor(actorLogic, opions?)`를 통해서 가능하다. `createActor(...)` 함수는 아래 인자들을 가진다:

- `actorLogic`
- `options`

actor를 생성할때 createActor(actorLogic)을 사용하면 생성된 actor가 root actor인 **actor system**을 암시적으로 생성한다. 이 root actor에서 spawn된 모든 actor와 그 자손은 해당 actor system의 일부이다. 액터는 actor system을 시작할 수 있는 `actor.start()`로 시작해야한다.

### Actor system

액터 시스템은 서로 의사소통할 수 있는 액터들의 모음이다. 액터는 같은 시스템에 속하고 있기 때문에 자연스러운 계층 구조를 형성하고, 다른 액터와 invoke/spawn할 수 있다.

XState에서는 root actor에서부터 시스템이 암시적으로 생성되고, 여기서 root actor는 `createActor(machine).start()`에서 반환되는 actor이다. 시스템은 액터의 actor.system 프로퍼티와 상태머신 액션의 디스트럭쳐링된 system의 프로퍼티를 통해 접근할 수 있다.

```typescript
import { createMachine, createActor } from "xstate";

const machine = createMachine({
  entry: ({ system }) => {
    //...
  },
});

const actor = createActor(machine).start();
actor.system;
```

시스템의 root는 명시적으로 `systemId`를 `createActor(...)` 함수에 할당해줄 수 있다.

```typescript
import { createActor } from "xstate";

const actor = createActor(machine, {
  systemId: "root-id",
});

actor.start();
```

액터의 시스템에서 root 액터에 이벤트를 보낼때 유용하다.

#### Actor registration

액터는 시스템에 등록되어 다른 액터의 시스템에서 이에 대한 참조를 얻을 수 있다.

invoked actors은(호출된 액터) invoke 객체 안에서 systemId를 통해 등록할 수 있다.

```typescript
import { createMachine, createActor } from "xstate";

const formMachine = createMachine({
  // ...
  on: {
    submit: {
      actions: sendTo(({ system }) => system.get("notifier"), {
        type: "notify",
        message: "Form submitted!",
      }),
    },
  },
});

const feedbackMachine = createMachine({
  invoke: {
    systemId: "notifier",
    src: notifierMachine,
  },
  // ...
  states: {
    // ...
    form: {
      invoke: formMachine,
    },
  },
});

const feedbackActor = createActor(feedbackMachine).start();
```

###
