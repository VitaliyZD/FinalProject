import mongoose from 'mongoose';
//все свойства пользователя
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,//хранит строчку
        required: true,//имя является обязательным
    },
    email: {
        type: String,
        required: true,
        unique: true//почта должна быть уникальной
    },
    passwordHash: {
        type: String,
        required: true,
    },
        type: String,
}, {
    timestamps: true, //дата создания
},
);

export default mongoose.model('User', UserSchema);