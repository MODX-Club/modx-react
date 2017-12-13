import {
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


import {
  sortBy,
} from '../resolver';


import {
  listField,
  listArgs,
  imageType,
  order,
} from '../fields';


export const MODXResourceSortBy = new GraphQLInputObjectType({
  name: "MODXResourceSortBy",
  fields: {
    by: {
      type: new GraphQLEnumType({
        name: 'MODXResourceSortByValues',
        values: {
          id: {
            value: 'id',
            description: 'По ID',
          },
          menuindex: {
            value: 'menuindex',
            description: 'По индексу в меню',
          },
          rand: {
            value: 'rand()',
            description: 'В случайном порядке',
          },
        },
      }),
      description: 'Способ сортировки',
    },
    dir: order,
  },
});

export const MODXResourceArgs = {
  id: {
    type: GraphQLInt,
    description: "Поиск по ID",
  },
  context_key: {
    type: GraphQLString,
    description: "Контекст",
  },
  parent: {
    type: GraphQLInt,
    description: "Фильтр по родителю",
  },
  uri: {
    type: GraphQLString,
    description: "Фильтр по УРЛу",
  },
  templates: {
    type: new GraphQLList(GraphQLInt),
    description: "Фильтр по шаблону",
  },
  showhidden: {
    type: GraphQLBoolean,
    description: "Показывать скрытые документы",
  },
  showunpublished: {
    type: GraphQLBoolean,
    description: "Показывать неопубликованные документы",
  },
};


export const MODXResourcesArgs = Object.assign({...MODXResourceArgs}, listArgs, {
  sort: {
    type: new GraphQLList(MODXResourceSortBy),
  },
});


export const MODXResourceFields = {
  id: {
    type: new GraphQLNonNull(GraphQLInt),
    description: "ID",
  },
  pagetitle: {
    type: GraphQLString,
    description: "Заголовок",
  },
  longtitle: {
    type: GraphQLString,
    description: "Длинный заголовок",
  },
  description: {
    type: GraphQLString,
    description: "Описание",
  },
  alias: {
    type: GraphQLString,
    description: "Псевдоним",
  },
  link_attributes: {
    type: GraphQLString,
    description: "Дополнительные атрибуты ссылки",
  },
  parent: {
    type: GraphQLInt,
    description: "ID родительского ресурса",
  },
  template: {
    type: GraphQLInt,
    description: "ID шаблона",
  },
  menuindex: {
    type: GraphQLInt,
    description: "Порядок сортировки в меню",
  },
  menutitle: {
    type: GraphQLString,
    description: "Заголовок в меню",
  },
  content: {
    type: GraphQLString,
    description: "Контент",
  },
  isfolder: {
    type: GraphQLBoolean,
    description: "Флаг, что это контейнер",
  },
  published: {
    type: GraphQLBoolean,
    description: "Опубликован",
  },
  createdby: {
    type: GraphQLInt,
    description: "Кем создан",
  },
  createdon: {
    type: GraphQLInt,
    description: "Дата создания",
  },
  publishedon: {
    type: GraphQLInt,
    description: "Дата публикации",
  },
  publishedby: {
    type: GraphQLInt,
    description: "Кем опубликован",
  },
  pub_date: {
    type: GraphQLInt,
    description: "Дата плановой публикации",
  },
  unpub_date: {
    type: GraphQLInt,
    description: "Дата планового снятия с публикации",
  },
  deleted: {
    type: GraphQLBoolean,
    description: "Удален",
  },
  searchable: {
    type: GraphQLBoolean,
    description: "Доступен для поиска",
  },
  cacheable: {
    type: GraphQLBoolean,
    description: "Кешируемый",
  },
  deletedon: {
    type: GraphQLInt,
    description: "Дата удаления",
  },
  deletedby: {
    type: GraphQLInt,
    description: "Кем удален",
  },
  editedon: {
    type: GraphQLInt,
    description: "Дата редактирования",
  },
  editedby: {
    type: GraphQLInt,
    description: "Кем отредактирован",
  },
  hidemenu: {
    type: GraphQLBoolean,
    description: "Скрыт в меню",
  },
  class_key: {
    type: GraphQLString,
    description: "Класс документа",
  },
  context_key: {
    type: GraphQLString,
    description: "Контекст",
  },
  content_type: {
    type: GraphQLInt,
    description: "Тип контента",
  },
  richtext: {
    type: GraphQLBoolean,
    description: "Используется расширенный редактор",
  },
  uri: {
    type: GraphQLString,
    description: "УРЛ документа",
  },
  uri_override: {
    type: GraphQLBoolean,
    description: "Флаг, что УРЛ заморожен",
  },
  hide_children_in_tree: {
    type: GraphQLBoolean,
    description: "В дереве документов скрывать все дочерние документы",
  },
  show_in_tree: {
    type: GraphQLBoolean,
    description: "Выводить в дереве документов",
  },
  price: {
    type: GraphQLFloat,
    description: "Цена",
  },
  price_old: {
    type: GraphQLFloat,
    description: "Старая цена",
  },
  article: {
    type: GraphQLString,
    description: "Артикул",
  },
  image: {
    type: GraphQLString,
    description: "Картинка",
  },
  imageFormats: imageType,
  tvs: {
    type: GraphQLJSON,
    description: "Дополнительные поля",
  },
  properties: {
    type: GraphQLJSON,
    description: "Дополнительные свойства документа",
  },
  _other: {
    type: GraphQLJSON,
    description: "Все остальные поля",
  },
};


const MODXResourceType = new GraphQLObjectType({
  name: 'MODXResourceType',
  description: "MODX-документ",
  fields: () => MODXResourceFields,
});


// export const SiteContentArgs = {
//   component: {
//     // type: new GraphQLNonNull(GraphQLString),
//     type: GraphQLString,
//     description: "Исполняемый компонент",
//   },
//   request: {
//     type: new GraphQLNonNull(GraphQLJSON),
//     description: "Параметры запроса",
//   },
//   geo: {
//     type: new GraphQLNonNull(GraphQLJSON),
//     description: "Координаты",
//   },
//   pathname: {
//     type: GraphQLString,
//     description: "Запрошенный УРЛ (Для отладки)",
//   },
//   companyId: {
//     type: GraphQLString,
//     description: "Запрошенная компания (Для отладки)",
//   },
//   city: {
//     type: GraphQLString,
//     description: "Город (Для отладки)",
//   },
// };


export const getList = (source, args, context, info) => {

  let {
    showhidden,
    showunpublished,
    showdeleted,
    parent,
    context_key,
    templates,
    uri,
    sort,
  } = args;

  const {
    MODXResourcesStore,
  } = context.state;

  let state = MODXResourcesStore && MODXResourcesStore.getState() || null;

  if(state){

    if(showunpublished !== true){
      state = state.filter(n => n.published === true);
    }

    if(showhidden !== true){
      state = state.filter(n => n.hidemenu === false);
    }

    if(showdeleted !== true){
      state = state.filter(n => n.deleted === false);
    }

    if(context_key !== undefined){
      state = state.filter(n => n.context_key === context_key);
    }

    if(parent !== undefined){

      state = state.filter(n => n.parent === parent);

    }

    if(templates && templates.length){

      state = state.filter(n => templates.indexOf(n.template) !== -1);

    }

    if(uri !== undefined){

      uri = decodeURI(uri);

      /*
        MODX во всех страницах вырезает начальный слеш.
        Главной странице надо замораживать URL /
      */
      if(uri && uri !== "/"){
        uri = uri.replace(/^\/*/, "");
      }

      state = state.filter(n => n.uri === uri);

    }

    if(sort){

      sort.map(rule => {

        const {
          by,
          dir,
        } = rule;

        if(!by){
          return;
        }

        let sortByRules;

        switch(by){

          case 'menuindex':

            sortByRules = n => n.menuindex;

            break;
        }

        if(sortByRules){

          state = sortBy(state, sortByRules, dir);

        };

      });

    }

  }

  return state;

  // const {
  // } = args;




  // const {
  //   remoteResolver,
  // } = context;

  // if(!remoteResolver){
  //   throw("remoteResolver undefined");
  // }


  // return new Promise(async (resolve, reject) => {

  //   try{

  //     const result = await remoteResolver(null, args, context, info);

  //     resolve( result && List([result]) || null);

  //   }
  //   catch(e){
  //     reject(e);
  //   }

  // });

};


export default MODXResourceType;
