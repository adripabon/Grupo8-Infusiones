function validationObj(obj, label, type, numCaracteres = 0){
    errors = []
    if(type === 1){
        if(!obj.value.length){
            errors.push(`Debes ingresar el ${label}`)
        }else if(obj.value.length <= 2){
            errors.push(`El ${label} debe tener al menos 2 caracteres`)
        }

        if( numCaracteres > 0 ){
            if(obj.value.length < numCaracteres){
                errors.push(`El ${label} debe tener al menos ${numCaracteres} caracteres`)
            }
        }
    }else if (type ===2){
        const filter = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
        
        if(!obj.value.length){
            errors.push(`Debes ingresar el ${label}`)
        }else if (!filter.test(obj.value)){
            errors.push(`Debes ingresar un ${label} válido`)
        }
    }else if(type === 3){
        const filter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$.!%*#?&]{8,}$/

        if(!filter.test(obj.value)){
            errors.push('La contraseña debe ser una combinación de al menos una mayúscula, una minúscula, mínimo 8 a 20 caracteres')
        }
    }else if (type === 4){
        var filePath 
        if(obj.value){
            filePath = obj.value
        }else if(obj.defaultValue){
            filePath = obj.defaultValue
        }
          
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
          
        if (!allowedExtensions.exec(filePath)) {
            errors.push('Receurde que las extensiones permitidas son .jpg, .jpeg, .png o .gif')
        } 
    }
    return errors
    
}

window.onload = function(e) {
    
    const name = document.getElementById('name')
    const description = document.getElementById('description')
    const image = document.getElementById('image')

    const form = document.querySelector('form')

    

    let errors = []

    form.addEventListener('submit', event => {
        event.preventDefault()

        errors.push(validationObj(name, 'nombre', 1, 5))
        errors.push(validationObj(description, 'descripcion', 1, 20))
        errors.push(validationObj(image, 'imagen', 4, 0))

        let sw = 0
        if(errors.length){
            const ulErrors = document.querySelector('.ul-errors')
            ulErrors.innerHTML = ''
            errors.forEach(error => {
               if(error.length > 0 ){
                ulErrors.innerHTML += `<li>${error}</li>`
                sw = 1;
               }
                    
            })
            
        }
        if(sw === 0){
            form.submit()
        }
        errors = []
    })
}