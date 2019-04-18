# RemoteData

If you find yourself having trouble to determine in wich state is your loaded data is before doing a computation on it, or if it happen to often that you code fail because it is optimisitic about the present of such data.

Please consider the following documentation and this typescript library.

## Reference
https://github.com/krisajenkins/remotedata
http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html

## installation

`yarn add ...`

## Introduction

The whole idea is that a RemoteData can be in only four states :
* NotAsked
* Loading
* Failure error
* Success data

Lets consider that we have a single page app that load a list of
post from a remote webservice.

```typescript
// first thing import remotedata
import * as RemoteData from "./remotedata";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

// declare the type of your State
type State = {
  posts: RemoteData.RemoteData<string, Post[]>;
};

// lets initialize our state holding value
const state: State = {
  posts: RemoteData.of()
};

// for each of this state we must prepare an appropiate response
const renderNotAsked = "Data not asked yet";
const renderLoading = "Data is loading !";
// since the state error hold an error value
// success a success value we use a function to extract it
const renderError = (error: string) =>
  `Data loading ended up in error ${error}`;
const renderData = JSON.stringify;

document.getElementById("app").innerHTML = state.posts.fold(
  renderNotAsked,
  renderLoading,
  renderError,
  renderData
);

```

The expected result since we just created our `remoteData` value will be `"Data not asked yet"`

```typescript
// if we change our remotedata status
const newState = {...state, posts: RemoteData.loading()};
// and reaply our render function to it
document.getElementById("app").innerHTML = newState.posts.fold(
  renderNotAsked,
  renderLoading,
  renderError,
  renderData
);
// => "Data is loading !"
// and if we go even further
const evenNewerState = {
  ...newState,
  posts: RemoteData.success([
    { id: 1, userId: 2, title: "title", body: "body" }
  ])
};
document.getElementById("app").innerHTML = evenNewerState.posts.fold(
  renderNotAsked,
  renderLoading,
  renderError,
  renderData
);
// => [{"id":1,"userId":2,"title":"title","body":"body"}]
```

in a real world we would use something like fetch to retrieve our remote data

## Derived data
Most of the time you need to compute data from what you fetch may it be a simple blog post count or a complex datavisualisation.

What can happen when your remote data is not yet available or will not be available at all (for example after a fetch failure) is that your code can fail, such failure can have numerous consequence depending on how you handle unexpected thing in your code.

As such data computed from a RemoteData should be considered remote data itself, `RemoteData` have your back here.

```typescript
type ListOfPostType = RemoteData<string, Post[]>;
// lets consider that we have a Succesfull RemoteData
const remoteData = RemoteData.success([...aListOfPosts]);

const postCount = remoteData.map(listOfPosts => listOfPost.length);
// Success(100)

// lets say we want to filter post by an author id
const filteredList = remoteData.map(
  listOfPosts => listOfPost.filter(post =>  post.userId === 1)
);
// Success([...filteredListOfPosts])
```

We can see above that the remoteData container can be mapped over, meaning that we can transform its inner value without changing its context.

But what happen if we do the same thing on context where the data does not exisit ?

```typescript
type ListOfPostType = RemoteData<string, Post[]>;
// lets consider that we have a Succesfull RemoteData
const remoteData = RemoteData.loading([...aListOfPosts]);

const postCount = remoteData.map(listOfPosts => listOfPost.length);
// Loading


// lets say we want to filter post by an author id
const filteredList = remoteData.map(
  listOfPosts => listOfPost.filter(post =>  post.userId === 1)
);
// Loading
```

On the three context where the data does not exist, the mapped function was not applyed by RemoteData and the current context was returned unchanged.
So we can safely create a pipeline of operation for the optimistic (the data exist) case without it failling on us at runtime.

This mean we can avoid taking into account those case in our processing code and that we can handle it in the same fashion when we render this data.

Simpler and safer code indeed.

## Map multiple RemoteData

What happen when we need to handle multiple source of data to create one concrete result for our user to enjoy ?

Ok lets keep using our blog example by assuming that Users data is loaded by another fetch call on a different webservice. And that we want on our blogpost list show their username as author instead of displaying a meaningless userid.

```typescript
// first thing import remotedata
import * as RemoteData from "./remotedata";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type User = {
  id: number,
  name: string,
}

// declare the type of your State
type State = {
  posts: RemoteData.RemoteData<string, Post[]>,
  users: RemoteData.RemoteData<string, User[]>,
};

// lets initialize our state holding value
const state: State = {
  posts: RemoteData.of(),
  users: RemoteData.of(),
};

// first lets build a function that will take the two data and return our computation.
const aggregatePostsAndUsers = posts => users => {
  return posts.map(post => {
    const user = users.find(user =>  user.id === post.userId);
    return {...post, author: user.name}
  });
}

// we can apply a map function to two remoteData
const aggregatedPostsAndUsers = RemoteData.map2(state.post, state.users, aggregatePostsAndUsers);
// NotAsked

```

Note the mapping function must expect to receive arguments one by one.

This generate a new RemoteData with the computed value associated.
The context of the provided RemoteData is used to compute the new context returned.

| remoteData1         | remoteData2         | Result   |
| ------------------- |:-------------------:| --------:|
| Success             | Success             | Success  |
| Failure             | any                 | Failure  |
| any                 | Failure             | Failure  |
| Failure1            | Failure2            | Failure1 |
| Loading             | NotAsked or Success | Loading  |
| NotAsked or Success | Loading             | Loading  |
| NotAsked            | NotAsked            | NotAsked |

# test


## API

### RemoteData instance

```typescript
RemoteData<E, T>::notAsked: void -> boolean
RemoteData<E, T>::loading: void -> boolean
RemoteData<E, T>::failure: void -> boolean
RemoteData<E, T>::success: void -> boolean
RemoteData<E, T>::map: (T -> B) -> RemoteData<E, B>
RemoteData<E, T>::getOrElse: T -> T
RemoteData<E, T>::fold: B -> B -> (E -> B) -> (T -> B ) -> B
```

### RemoteData

#### Creation


```typescript
notAsked<E, T>: void -> RemoteData<E, T>
loading<E, T>: void -> RemoteData<E, T>
failure<E, T>: E -> RemoteData<E, T>
success<E, T>: T -> RemoteData<E, T>
```

#### introspection

```typescript
isNotAsked: RemoteData<E, T> -> boolean
isLoading: RemoteData<E, T> -> boolean
isFailure: RemoteData<E, T> -> boolean
isSuccess: RemoteData<E, T> -> boolean
```

### transformation

```typescript
map: RemoteData<E, T> -> (T -> B) -> RemoteData<E, B> 
```

### aggregation
```typescript
andMap: RemoteData<E, A> -> RemoteData<E, (A -> B)> -> RemoteData<E, B>

map2: RemoteData<E, A> -> RemoteData<E, B> -> (A -> B -> C) -> RemoteData<E, C>
map3: RemoteData<E, A> -> RemoteData<E, B> -> RemoteData<E, C> -> (A -> B -> C -> D) -> RemoteData<E, D>

append: RemoteData<E, A> -> RemoteData<E, B> -> RemoteData<E, [A, B]>
```

## run examples

`yarn && yarn start`