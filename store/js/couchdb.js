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
        "tag": "",
        "caption": "",
        "primary": "",
        "number": 0,
        "encode": ""
    }
};


const fetchRequest = async (event, query) => {
    const credentials = btoa(`${databasePrefix}:${databasePrefix}`);
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

async function selectCouchDB() {
    const response = await fetchRequest('_find', query['select']);
    return response;
}

async function existCouchDB() {
    const response = await fetchRequest('_find', query['exist']);
    return response;
}

async function insertCouchDB() {
    const response = await fetchRequest('', query['insert']);
    return response;
}