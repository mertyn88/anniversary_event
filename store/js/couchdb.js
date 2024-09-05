const date = new Date();
const today = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

const query = {
    "selectAll": {
        "selector": {},
        "fields": [
            "number",
            "date",
            "encode"
        ],
        "sort": [
            {
                "number": "asc"
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
        "date": today,
        "number": 0,
        "encode": ''
    }
};


const fetchRequest = async (event, query) => {
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

async function selectAllDocument(selectQuery) {
    const response = await fetchRequest('_find', selectQuery);
    return response;
}

async function existDocument(exsitQuery) {
    const response = await fetchRequest('_find', exsitQuery);
    return response;
}

async function insertDocument(insertQuery) {
    console.log(insertQuery);
    const response = await fetchRequest('', insertQuery);
    return response;
}