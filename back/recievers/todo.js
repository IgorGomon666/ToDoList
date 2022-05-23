const Todo = require('../models/Todo')


module.exports.getToDo = async function(req,res){
    let mbToDo = await Todo.findOne({_id: req.body.id}).catch(err=>{
        res.status(202).json({
            message:`404`
        })
    })
    if(!mbToDo){
        mbToDo = {_id: null}
    }
    if(mbToDo._id==req.body.id){
        res.status(201).json(mbToDo)
    }else{
        res.status(404)
    }
}
module.exports.createToDo = async function(req,res){
    const todo = new Todo({
        name:req.body.name,
        creator:req.body.creator,
        access:req.body.access,
        listItems:req.body.listItems
    })
    err = false
    let exists = await Todo.findOne({name: req.body.name})
    if(!exists){
        exists = {name:null}
    }
    await todo.save()
    .catch(err=>{
        console.log(err)
        err = true
    })
    if(err){
        res.status(500).json({
            message:`Somthing went wrong`
        })
    }else{
        let id = await Todo.findOne({name: req.body.name})
        res.status(201).json({
            message:`ToDo "${req.body.name}" created succesfully`,
            _id: id._id.toString()
        })
    }
    
    
}
module.exports.changeToDo = async function(req,res){
    let listItems = []
    let error = false
    if(req.body.mode=="fastAddToDo"){
        listItems.push(req.body.name)
        const todo = await Todo.findOne({_id: req.body.id})
        let oldCheck = todo.checked
        oldCheck.push(false)
        if(todo){
            todo.listItems.push(listItems)
            const toDoList = await Todo.findOneAndUpdate({_id: req.body.id},{listItems: todo.listItems, checked: oldCheck}).catch(err=>{
                console.log(err)
                error = true
            })
            if(toDoList){
                res.status(201).json({
                    message: "Ok"
                })
            }else{
                res.status(202).json({
                    message: "Something went wrong"
                })
            }
        }else{
            res.status(203).json({
                message: `Something went wrong(can't find ToDo with id ${req.body.id})`
            })
        }
    }else if(req.body.mode=="deleteToDo"){
        const todo = await Todo.findOne({_id: req.body.id}).catch(err=>{
            console.log(err)
            error = true
        })
        if(error){
            res.status(202).json({
                message:`Something went wrong(can't find ToDo with id ${req.body.id})`
            })
        }else{
            let listItems = todo.listItems
            let checkItems = todo.checked
            listItems.splice(req.body.which,1)
            checkItems.splice(req.body.which,1)
            const toDoList = await Todo.findOneAndUpdate({_id: req.body.id},{listItems: listItems, checked: checkItems}).catch(err=>{
                console.log(err)
                error = true
            })
            if(toDoList&&!error){
                res.status(201).json({
                    message: "deleted"
                })
            }else{
                res.status(202).json({
                    message:`Something went wrong(can't delete item)`,
                    error: err
                })
            }
        }
    }else if(req.body.mode=="changeCheck"){
        const todo = await Todo.findOne({_id: req.body.id}).catch(err=>{
            console.log(err)
            error = true
        })
        if(error){
            res.status(202).json({
                message:`Something went wrong(can't find ToDo with id ${req.body.id})`
            })
        }else{
            let checkArr = todo.checked
            checkArr[req.body.which] = req.body.switch
            const toDoList = await Todo.findOneAndUpdate({_id: req.body.id},{checked: checkArr}).catch(err=>{
                console.log(err)
                error = true
            })
            if(error){
                res.status(202).json({
                    message:`Something went wrong(can't manage item)`,
                    error: err
                })
            }else{
                res.status(201).json({
                    message: "I did a check"
                })
            }
        }
    }else if(req.body.mode=="changeName"){
        const todo = await Todo.findOne({_id: req.body.id}).catch(err=>{
            console.log(err)
            error = true
        })
        if(error){
            res.status(202).json({
                message:`Something went wrong(can't find ToDo with id ${req.body.id})`
            })
        }else{
            let updateListItems = todo.listItems
            updateListItems[req.body.which] = [req.body.newName]
            const toDoList = await Todo.findOneAndUpdate({_id: req.body.id},{listItems: updateListItems}).catch(err=>{
                console.log(err)
                error = true
            })
            if(error){
                res.status(202).json({
                    message:`Something went wrong(can't manage item)`,
                    error: err
                })
            }else{
                res.status(201).json({
                    message: "I did a nameChange"
                })
            }
        }
    }else if(req.body.mode == "changeListName"){
        const todo = await Todo.findOne({_id: req.body.id}).catch(err=>{
            console.log(err)
            error = true
        })
        if(error){
            res.status(202).json({
                message:`Something went wrong(can't find ToDo with id ${req.body.id})`
            })
        }else{
            const toDoList = await Todo.findOneAndUpdate({_id: req.body.id},{name: req.body.newListName}).catch(err=>{
                console.log(err)
                error = true
            })
            if(error){
                res.status(202).json({
                    message:`Something went wrong(can't manage item)`,
                    error: err
                })
            }else{
                res.status(201).json({
                    message: "I did a nameChange"
                })
            }
        }
    }
}
module.exports.deleteToDo = async function(req,res){
    let error = false
    const todo = await Todo.findOne({_id: req.body.id})
    if(todo){
        const deleteToDo = await Todo.deleteOne({_id: req.body.id}).catch(err=>{
            console.log(err)
            error = true
        })
        if(error){
            res.status(202).json({
                message:`Something went wrong(can't delete ToDo with id ${req.body.id})`
            })
        }else{
            res.status(201).json({
                message:`deleted: ${req.body.id})`
            })
        }
    }else{
        res.status(202).json({
            message:`Something went wrong(can't find ToDo with id ${req.body.id}). Maybe it's already deleted`
        })
    }
    res.status(201).json({
        reciever:"deleteTodo"
    })
    
}
module.exports.copyToDo = async function(req,res){
    const todo = await Todo.findOne({_id: req.body.id})
    if(todo){
        const copyTodo = new Todo({
            name:todo.name+"(copy)",
            creator:todo.creator,
            access:todo.access,
            listItems:todo.listItems
        })
        await copyTodo.save()
        res.status(201).json({
            id: copyTodo._id
        })
    }else{
        res.status(202).json({
            message: 'Somthing went wrong'
        })
    }
}