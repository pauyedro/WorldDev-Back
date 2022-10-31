const{db} = require('../firebase')

async function getUsers(){
    const querySnapshot = await db.collection('users').get()

    let contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    contacts = contacts.filter(e => e.rol === 'user')
     return  contacts
}

async function getAdmins(){
    const querySnapshot = await db.collection('users').get()

    let contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    contacts = contacts.filter(e => e.rol === 'admin')
     return  contacts
}

async function createUser(body){
    const id = body.id
    delete body.id

    await db.collection('users').doc(id).set(body, { merge: true }) 

    return 'User created!'
}

async function getUserById(id){
    let userFinded = await db.collection('users').doc(id).get()
    userFinded = {
        id: userFinded.id,
        ...userFinded.data()
    }
    return userFinded
}

async function updateUser(body){
    const id = body.id
    delete body.id

    await db.collection('users').doc(id).update(body)

    return 'User modify!'
}
async function deleteUser(id){
    await db.collection('users').doc(id).delete()
    return 'User deleted!'
}
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAdmins
}
