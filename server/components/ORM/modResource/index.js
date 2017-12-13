import MODXResourceType from 'modx-react/src/components/ORM/modResource';

export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;

  const {
    resourceType,
  } = args;

  return new Promise((resolve, reject) => {

    let action = 'resources/getdata';

    // throw(new Error( action)); 

    let {
      ...other
    } = args;

    let params = {...other};

    let request = SendMODXRequest(action, params);

    request
    .then((r) => {

      if(!r || !r.success){

        return reject(r && r.message || "Ошибка выполнения запроса");
      }



      // Получаем все ключи модели
      var modelFields = Object.keys(MODXResourceType._fields);

      let data = r.data;

      if(data && !Array.isArray(data)){
        data = [data];
      }

      data = data && data.map(n => {

        if(!n){
          return null;
        }

        const keys = Object.keys(n);

        let _other = {};

        let object = {};
      	

        // Набиваем все перечисленные в модели поля данными
        keys.map(key => {
          
          let value = n[key];

          switch(key){

            case 'isfolder':
            case 'published':
            case 'deleted':
            case 'hidemenu':
            case 'uri_override':
            case 'hide_children_in_tree':
            case 'show_in_tree':

              value = value && parseInt(value) === 1 ? true : false;

              break;

            case "properties":

              // Если свойства переданы строкой, а не JSON-объектом, преобразуем в JSON
              if(value && typeof value === "string"){

                try{
                  value = JSON.parse(value);
                }
                catch(e){
                  console.error(e);
                }

              }

              break;

          }

          // Основные поля модели
          if(modelFields.indexOf(key) !== -1){

            object[key] = value;

          }
          else{
            // Прочее
            _other[key] = value;
          }


        });

        Object.assign(object, {
          _other,
        });

        return object;

      }) || null;

      r.data = undefined;

      r.object = data;

      return resolve(r);

    })
    .catch((e) => {
      return reject(e);
    });

  });
}