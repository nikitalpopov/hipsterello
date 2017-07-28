/**
 * Created by @nikitalpopov on 13/07/2017.
 */

import { User as UserModel } from '../entities/User';

export default class User {
    /**
     * @description Создаем пользователя
     * @param userData
     */
    static createUser(userData) {
        const UserModelInstance = new UserModel({
            email: userData.email,
            password: userData.password
        });

        return UserModelInstance
            .save()
            .then((createdUser) => { return createdUser })
            .catch(console.log.bind(console));
    };

    /**
     * @description Находим пользователя по его id
     * @param userId
     */
    static findUserById(userId) {
        return UserModel
            .findById(
                userId,
                ['_id', 'email']
            )
            .catch(console.log.bind(console));
    };

    /**
     * @description Находим пользователя по его email
     * @param userData
     */
    static findUserByEmail(userData) {
        return UserModel
            .findByEmail(userData.email)
            .catch(console.log.bind(console));
    };
    /**
     * @description Обновляем данные пользователя
     * @param userData
     */
    static updateUser(userData) {
        return UserModel
            .findById(userData._id)
            .then((foundUser) => {
                if (userData.password === foundUser.password) {
                    if (userData.email) foundUser.email = userData.email;
                    if (userData.password) foundUser.password = userData.password;

                    return foundUser
                        .save()
                        .catch(console.log.bind(console));
                } else {
                    throw new Error('Wrong password! Cannot update current user!')
                }
            })
            .then((savedResult) => { return savedResult })
            .catch(console.log.bind(console));
    };

    /**
     * @description Удаляем данные пользователя
     * @param userData
     */
    static deleteUser(userData) {
        if (!userData._id && !userData.email) {
            throw new Error('There is no ids for delete!')
        }
        if (userData._id) {
            return UserModel
                .findById(userData._id)
                .then((foundUser) => {
                    if (userData.password === foundUser.password) {
                        return foundUser
                            .remove()
                            .catch(console.log.bind(console));
                    } else {
                        throw new Error('Wrong password! Cannot delete current user!')
                    }
                })
                .then((deletedResult) => { return deletedResult })
                .catch(console.log.bind(console));
        } else {
            return UserModel
                .findByEmail(userData.email)
                .then((foundUser) => {
                    if (userData.password === foundUser.password) {
                        return foundUser
                            .remove()
                            .catch(console.log.bind(console));
                    } else {
                        throw new Error('Wrong password! Cannot delete current user!')
                    }
                })
                .then((deletedResult) => { return deletedResult })
                .catch(console.log.bind(console));
        }
    };
}