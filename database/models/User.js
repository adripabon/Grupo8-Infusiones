module.exports = (sequelize, dataTypes) =>{
    let alias = 'Users'
    let columns = {
        id_users: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        first_name: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        second_password: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        province: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        location: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        street: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        avatar: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        id_profile: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'users',
        timestamps: false  
    }
    
    const User = sequelize.define(alias, columns, config)
    
    User.associate = function(models){
        User.belongsTo(models.Profiles, {
            as: "profile",
            foreignKey: "id_profile",
            timestamps: false
        })
    }
    return User
}