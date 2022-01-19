module.exports = (sequelize, dataTypes) =>{
    let alias = 'Profiles'
    let columns = {
        id_profile: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        tableName: 'profile',
        timestamps: false  
    }
    
    const Profile = sequelize.define(alias, columns, config)
    
    Profile.associate = function(models){
        Profile.hasMany(models.Users, {
            as: "user",
            foreignKey: "id_profile",
        })
    }
    return Profile
}