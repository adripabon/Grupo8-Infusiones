/* Contine los controladores del index */
const mainController = {
   /*  index: (req,res)=>{
        res.render('index',{about, 'menu': listaPlatos})
    }, */
    index: (req, res) => {
        res.render('index');
    }
}

module.exports = mainController