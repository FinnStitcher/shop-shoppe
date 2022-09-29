export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
};

export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        // open connection to db
        const request = window.indexedDB.open('shop-shop', 1);

        // variables
        let db, tx, store;

        // if db does not exist or version has changed, create db and stores
        request.onupgradeneeded = function (e) {
            const db = request.result;

            db.createObjectStore('products', {keyPath: '_id'});
            db.createObjectStore('categories', {keyPath: '_id'});
            db.createObjectStore('cart', {keyPath: '_id'});
        };

        // handle connection errors
        request.onerror = function (e) {
            console.log('There was an error with IndexedDB');
        };

        // on successfully opening the db
        // we set things up so we repeatedly open and close the db, rather than having it continually listen
        // this avoids a lot of what-if logic and makes this function generic/reusable
        request.onsuccess = function(e) {
            // store references to the database, transaction, and relevant object store
            db = request.result;
            // thats the variable we declared earlier, not the new one in onupgradeneeded
            tx = db.transaction(storeName, 'readwrite');
            store = tx.objectStore(storeName);

            switch(method) {
                case 'put':
                    store.put(object);
                    resolve(object);
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function() {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object._id);
                    break;
                default:
                    console.log('No valid method.');
                    break;
            }

            db.onerror = function(e) {
                console.log('Error within onsuccess', e);
            };

            tx.oncomplete = function() {
                db.close();
            };
        }
    });
}
