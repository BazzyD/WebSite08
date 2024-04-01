const express = require('express');
const bodyParser = require('body-parser');// use to work with JSON format in post request

const app = express();
const port = process.env.PORT || "3000";

app.use(bodyParser.json());
//SERVER API DATA
let dataStore={1:{id:"1",data:"TestData",key:"TestVal"},
                2:{id:"2",data:"Test2Data",key:"Test2Val"},
                3:{id:"3",data:"Test3Data",key:"Test3Val"}
};
app.get('/items', (req, res)=>{
    const {id} = 1;
    if(dataStore[id]){
     res.json(dataStore[id]);
    }
    else{
     res.status(404).send("No DATA found");
    }
 });

app.get('/items/:id', (req, res)=>{
   const {id} = req.params;
   if(dataStore[id]){
    res.json(dataStore[id]);
   }
   else{
    res.status(404).send("No data found");
   }
});

app.post('/items', (req, res)=>{
    const { id, data, key } = req.body;
    dataStore[id]={id,data,key};
    console.log(dataStore);
    res.status(201).send(`Item Added id: ${id}`);
});
app.put('/items/:id', (req, res)=>{
    const { id, data, key } = req.body;
    if(!dataStore[id]){
        res.status(404).send(" Item Not found");
    }
    dataStore[id]={id,data,key};
    console.log(dataStore);
    res.status(201).send(dataStore[id]);
});

app.delete('/items/:id', (req, res)=>{
    const { id } = req.params;
    if(!dataStore[id]){
        res.status(404).send(" Item Not found");
    }
    delete dataStore[id];
    res.status(204);
});

app.fetch('/items/:id', (req, res)=>{
    const { id } = req.params;
    if(!dataStore[id]){
        res.status(404).send(" Item Not found");
    }
    res.json(dataStore[id]);
});

app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});

