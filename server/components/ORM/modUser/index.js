import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';


export const prepareUserData = function(user){
  
  if(user){
  
    const {
      active,
      blocked,
      sudo,
      delegate,
      // createdon,
      notices,
    } = user;
  
    Object.assign(user, {
      active: active === '1' ? true : false,
      blocked: blocked === '1' ? true : false,
      sudo: sudo === '1' ? true : false,
      delegate: delegate === '1' ? true : false,
      // createdon: parseInt(createdon) || null,
      notices: notices && notices.map(n => {
  
        Object.assign(n, {
          id: parseInt(n.id),
          active: parseInt(n.active) === 1 ? true : false,
        });
  
        return n;
      }) || null,
    });

  }

  return user;

}


export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;

  return new Promise((resolve, reject) => {
    let {
      id,
      limit,
      page,
      offset: start,
      count,
      search,
      ownProfile,
      delegatesOnly,
    } = args || {};

    limit = limit || 0;

    let action = 'users/getdata';

    let params = {
      id,
      limit,
      page,
      start,
      count: count === undefined ? 1 : count,
      search,
      ownProfile,
      delegatesOnly,
    };

    params = Object.assign({}, args, params);

    let request = SendMODXRequest(action, params);

    request
    .then((data) => {



      if(!data.success){

        return reject(data.message || "Ошибка выполнения запроса");
      }

      if(data.object){

        if(!Array.isArray(data.object)){
          data.object = [data.object];
        }

        data.object.map(user => {

          return prepareUserData(user);

        });

      }

      return resolve(data);
    })
    .catch((e) => {
      return reject(e);
    })
    ;
  });
}


export const update = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;

  return new Promise((resolve, reject) => {
    let {
      id,
      data,
    } = args || {};

    let action = 'user/own_profile/update';

    let params = {
    };

    params = Object.assign({}, args, data || {}, params);

    let request = SendMODXRequest(action, params);

    request
    .then((data) => {

      if(!data.success){

        return reject(data.message || "Ошибка выполнения запроса");
      }

      return resolve(prepareUserData(data.object));
    })
    .catch((e) => {
      return reject(e);
    })
    ;
  });
}

