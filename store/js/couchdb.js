const date = new Date();
const today = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

const query = {
    "select": {
        "selector": {
            "primary": {
                "$nin": []
            }
        },
        "fields": [
            "date",
            "tag",
            "caption",
            "primary",
            "number",
            "encode"
        ],
        "sort": [
            {
                "date": "desc"
            },
            {
                "number": "desc"
            }
        ]
    },
    "exist": {
        "selector": {
            "$and": [
                {
                    "date": today
                }
            ]
        },
        "fields": [
            "number",
            "date"
        ],
        "sort": [
            {
                "number": "desc"
            }
        ],
        "limit": 1
    },
    "insert": {
        "date": today, //내부 삽입 날짜
        "tag": [],
        "caption": "",
        "primary": "",
        "number": 0,
        "latitude": 0.0,
        "longitude": 0.0,
        "encode": ""
    }
};


const fetchGetRequest = async (url) => {
    const credentials = btoa(`${databasePrefix}:${databasePrefix}`);
    console.log(credentials);
    const response = await fetch(`${databaseUrl}/${url}`, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};

const fetchRequest = async (event, query) => {
    const credentials = btoa(`${databasePrefix}:${databasePrefix}`);
    console.log(credentials);
    const response = await fetch(`${databaseUrl}/${event}`, {
        method: "POST",
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    });
    return response.json();
};

async function selectCouchDB(_query) {
    const response = await fetchRequest('_find', _query);
    return response;
}

async function existCouchDB() {
    const response = await fetchRequest('_find', query['exist']);
    return response;
}

async function insertCouchDB(_query) {
    const response = await fetchRequest('', _query);
    return response;
}