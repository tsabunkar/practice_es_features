const usersArray = [{
        id: 1,
        name: 'Tejas',
        schoolId: 101
    },
    {
        id: 2,
        name: 'Ram',
        schoolId: 232
    }
]

const gradesArray = [{
        // id: 1,
        schoolId: 101,
        marks: 85
    },
    {
        // id: 2,
        schoolId: 232,
        marks: 95
    },
    {
        // id: 1,
        schoolId: 101,
        marks: 94
    },
    {
        // id: 2,
        schoolId: 232,
        marks: 72
    }
]

const getUser = (idToFind) => {
    return new Promise((resolve, reject) => {
        const userFound = usersArray.find((user) => {
            return user.id === idToFind
        })
        if (userFound) {
            resolve(userFound);
        } else {
            reject(`Unable to find the user for id :${idToFind}`);
        }
    })
}


const getGrades = (schoolIdToFind) => {
    return new Promise((resolve, reject) => {
        let filteredArray = gradesArray.filter((gradeObj) => {
            return gradeObj.schoolId === schoolIdToFind;
        })
        resolve(filteredArray);
    })
}

const getStudentStatus = (userId) => {
    let tempUser;
    return getUser(userId).then((userObject) => {
            console.log('---------');
            console.log('userObject : ', userObject);
            tempUser = userObject;
            return getGrades(userObject.schoolId) //returning Promise so below used one more then()
        })
        .then((gradesArr) => {
            let average = 0;

            if (gradesArr.length > 0) {
                let marksArr = gradesArr.map((gradeObj) => gradeObj.marks)
                console.log('marksArr :', marksArr);
                let sumOfMarks = marksArr.reduce((a, b) => {
                    return a + b;
                })
                console.log('sumOfMarks :', sumOfMarks);
                average = sumOfMarks / gradesArr.length;
            }

            console.log('average : ', average);

            return `${tempUser.name} has an ${average}% in the class`
        })
        .catch((err) => {
            console.log(err);
        });
}

//------------------------------------------------------------------------------------------------------

const playWithAwait = async (userId) => {
    const userObj = await getUser(userId); //Here we r waiting for the promise either to be resolved or reject, 
    //thus node will wait/halt its execution untill this promise is either rejected or resolved 
    //form the eventloop
    const promiseObj = getUser(userId);

    console.log('using await ->', userObj); //{ id: 2, name: 'Ram', schoolId: 232 }     (Returning the Object)
    console.log('without using await ->', promiseObj); // Promise { { id: 2, name: 'Ram', schoolId: 232 } }    (Returning Promise Object)

}


playWithAwait(2).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

//------------------------------------------------------------------------------------------------------

const getStudentStatusUsingAsyncAwait = async (userId) => {
    let userObj = await getUser(userId);
    let gradesArr = await getGrades(userObj.schoolId)
    // console.log(userObj);
    // console.log(gradesArr);

    let average = 0;

    if (gradesArr.length > 0) {
        let marksArr = gradesArr.map((gradeObj) => gradeObj.marks)
        console.log('marksArr :', marksArr);
        let sumOfMarks = marksArr.reduce((a, b) => {
            return a + b;
        })
        console.log('sumOfMarks :', sumOfMarks);
        average = sumOfMarks / gradesArr.length;
    }

    console.log('average : ', average);
    return `${userObj.name} has an ${average}% in the class` //NO need of using temp varaibale to store the value of previous promise data
}


getStudentStatusUsingAsyncAwait(2).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});