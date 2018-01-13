import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';

import { List } from 'immutable';

// import {
//   CommentType,
// } from '../Comment';

// import UserNoticeType from '../UserNotice';

import {
  listField,
  listArgs,
  imageType,
  // ObjectsListType,
} from '../fields';


const args = {
  username: {
    type: GraphQLString,
    description: "Поиск по юзернейму",
  },
};

export const UserArgs = Object.assign({...args},{
  id: {
    type: GraphQLInt,
  },
  ownProfile: {
    type: GraphQLBoolean,
    description: "Получить текущего пользователя",
  },
});


export const UsersArgs = Object.assign({...args},{
  delegatesOnly: {
    type: GraphQLBoolean,
    description: "Только представители",
  },
  myOnly: {
    type: GraphQLBoolean,
    description: "Только мои",
  },
}, listArgs);


export const UserFields = { 
  id: {
    type: GraphQLInt
  },
  username: {
    type: GraphQLString
  },
  fullname: {
    type: GraphQLString
  },
  email: {
    type: GraphQLString,
  },
  image: {
    type: GraphQLString,
  },
  imageFormats: imageType,
  active: {
    type: GraphQLBoolean,
  },
  blocked: {
    type: GraphQLBoolean,
  },
  sudo: {
    type: GraphQLBoolean,
  },
  delegate: {
    type: GraphQLBoolean,
    description: "Флаг того, что пользователь - представитель компании.",
  },
  createdon: {
    type: GraphQLInt,
    description: "Дата регистрации пользователя",
  },
  offer: {
    type: GraphQLString,
    description: "Коммерческое предложение",
  },
  offer_date: {
    type: GraphQLInt,
    description: "Дата отправки коммерческого предложения",
  },
  contract_date: {
    type: GraphQLInt,
    description: "Дата заключения сделки",
  },
  createdby: {
    type: GraphQLInt,
    description: "Кем создана учетка пользователя",
  },
  _isDirty: {
    type: GraphQLJSON,
    description: "Измененные данные",
  },
  _errors: {
    type: GraphQLJSON,
    description: "Ошибки",
  },
};


export const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Пользователь',
  fields: () => (UserFields),
});


export const getList = (source, args, context, info) => {

  const {
    UsersStore,
  } = context.state;

  const {
    username,
    delegatesOnly,
    myOnly,
    ownProfile,
  } = args;




  if(ownProfile){

    const {
      remoteResolver,
    } = context;

    if(!remoteResolver){
      throw("remoteResolver undefined");
    }


    return new Promise(async (resolve, reject) => {

      try{

        const result = await remoteResolver(null, args, context, info);

        resolve( result && List([result]) || null);

      }
      catch(e){
        reject(e);
      }

    });
    
  }
 

  let state = UsersStore.getState();

  if(myOnly){

    const {
      user,
    } = context.props || {};

    const currentUser = user && user.user;

    if(!currentUser){
      return null;
    }

    state = state.filter(n => n.createdby === currentUser.id);

  }

  if(username){
    state = state.filter(n => n.username === username);
  }

  if(delegatesOnly){
    state = state.filter(n => n.delegate === true);
  }

  return state;
};




export const Mutations = {
  updateUser: {
    type: UserType,
    description: "Обновление пользователя",
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: "ID пользователя",
      },
      data: {
        type: new GraphQLNonNull(GraphQLJSON),
        description: "Данные пользователя",
      }
    },
  },
};


export default UserType;