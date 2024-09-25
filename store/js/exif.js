export async function coordinate(img) {
    return new Promise((resolve, reject) => {
        EXIF.getData(img, async function () {
            try {
                resolve(await getValue(this)); // 여기서 Promise를 resolve하여 결과를 반환
            } catch (error) {
                reject(error); // 오류가 발생하면 reject 호출
            }
        });
    });
}

async function getValue(e) {
    var exifLong = EXIF.getTag(e, "GPSLongitude");
    var exifLat = EXIF.getTag(e, "GPSLatitude");
    var exifLongRef = EXIF.getTag(e, "GPSLongitudeRef");
    var exifLatRef = EXIF.getTag(e, "GPSLatitudeRef");

    if (exifLat && exifLong) {
        if (exifLatRef == "S") {
            var latitude = (exifLat[0] * -1) + (((exifLat[1] * -60) + (exifLat[2] * -1)) / 3600);
        } else {
            var latitude = exifLat[0] + (((exifLat[1] * 60) + exifLat[2]) / 3600);
        }

        if (exifLongRef == "W") {
            var longitude = (exifLong[0] * -1) + (((exifLong[1] * -60) + (exifLong[2] * -1)) / 3600);
        } else {
            var longitude = exifLong[0] + (((exifLong[1] * 60) + exifLong[2]) / 3600);
        }

        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);

        return {
            "latitude": latitude,
            "longitude": longitude
        };

    }

    console.log("GPS data not found.");
    return {
        "latitude": 0.0,
        "longitude": 0.0
    };
}