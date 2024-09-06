// 지원여부확인
if (!window.indexedDB) {
    window.alert("browser doesn't support IndexedDB");
}

let databaseName = 'image_store';
let transactionName = 'album';
let objectName = 'album';

var db;
var request = window.indexedDB.open(databaseName);

// 새로만들거나 버전이 높을때만 발생하는 이벤트 
// ObjectStroe를 만들거나 수정할때 이 이벤트내에서 진행
// onsuccess는 이 이벤트가 끝나면 발생됩니다.
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    // person 이라는 이름으로 ObjectStore를 만듬, key를 따로 만들지 않고 자동생성함.
    var objectStore = db.createObjectStore(objectName, { keyPath: 'id', autoIncrement: true });
}
request.onerror = function (event) {
    alert('failed');
}
request.onsuccess = function (event) {
    db = this.result;
}

function openIndexedDB(callback) {
    var request = window.indexedDB.open(databaseName);

    request.onerror = function (event) {
        console.error("Database error: ", event.target.errorCode);
    };

    request.onsuccess = function (event) {
        var db = event.target.result;
        callback(db);
    };
}

function openTransaction(db, callback) {
    var transaction = db.transaction([transactionName], 'readwrite');

    transaction.onerror = function (event) {
        console.error("Transaction failed: ", event.target.error);
    };

    transaction.oncomplete = function (event) {
        console.log("Transaction completed.");
    };

    callback(transaction);
}

function openObjectStore(transaction, callback) {
    callback(transaction.objectStore(objectName));
}

function withObjectStore(callback) {
    openIndexedDB(function (db) {
        openTransaction(db, function (transaction) {
            openObjectStore(transaction, function (objectStore) {
                callback(objectStore);
            });
        });
    });
}


function selectOneIndexedDB(key) {
    withObjectStore(function (objectStore) {
        var request = objectStore.get(key);
        request.onsuccess = function (event) {
            var result = event.target.result;
            console.log(result);
        }
    });
}

function selectAllIndexedDB2() {
    withObjectStore(function (objectStore) {
        var request = objectStore.openCursor();
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                console.log(cursor.value);
                cursor.continue();
            }
        }
    });
}

function selectAllIndexedDB() {
    return new Promise((resolve, reject) => {
        let results = [];  // 데이터를 저장할 배열

        withObjectStore(function (objectStore) {
            var request = objectStore.openCursor();

            request.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    results.push(cursor.value);  // 데이터를 배열에 저장
                    cursor.continue();
                } else {
                    resolve(results);  // 커서가 끝나면 데이터를 반환
                }
            };

            request.onerror = function (event) {
                reject(event.target.error);  // 오류 발생 시 reject
            };
        });
    });
}

function writeIndexedDB(data) {
    withObjectStore(function (objectStore) {
        data.forEach(function (datum) {
            var request = objectStore.add(datum);
            request.onsuccess = function (event) {
                console.log('Added', event.target.result);
            };
        });
    });
}

function updateIndexedDB(key, value) {
    withObjectStore(function (objectStore) {
        var request = objectStore.get(key);
        request.onsuccess = function (event) {
            var data = event.target.result;
            // 주의: 여기서 Object.assign을 사용하거나 다른 방법으로 필드를 업데이트 해야 함
            var updateRequest = objectStore.put(data);
            updateRequest.onerror = function (event) {
                console.error('Update error:', event.target.error);
            };
            updateRequest.onsuccess = function (event) {
                console.log('Update success', event.target.result);
            };
        };
    });
}

function deleteIndexedDB(key) {
    withObjectStore(function (objectStore) {
        var deleteRequest = objectStore.delete(key);
        deleteRequest.onsuccess = function (event) {
            console.log('Deleted', event.target.result);
        };
    });
}

function deleteAllIndexedDB() {
    withObjectStore(function (objectStore) {
        var deleteRequest = objectStore.clear();
        deleteRequest.onsuccess = function (event) {
            console.log('All entries deleted');
        };
    });
}