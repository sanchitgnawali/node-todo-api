const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: "first text object"
    },
    {   
        _id: new ObjectID(),
        text: "second text object",
        completed: true,
        completedAt: 333
    }
];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
       return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = 'Todo test text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err)
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });

    it('should return 400 when data is invalid',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err) {
                return done(err);
            }
            
            Todo.find().then((todos) =>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })

    });

});

describe('/GET todos',() =>{

    it('should get all the todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    });

});


describe('/GET todos',()=>{

    it('should find todo by id',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        }).end(done);

    });

    it('should return 400 when id is invalid',(done)=>{
        request(app)
        .get('/todos/344564')
        .expect(404)
        .end(done);
    });

    it('should return 404 when id is valid but data is unavailable',(done)=>{
        request(app)
        .get('/todos/5aa58e861ff54b6c538b0bdd')
        .expect(404)
        .end(done);
    })

});

describe('DELETE /todos',()=>{

    it('should delete a todo',(done)=>{
        var id = todos[0]._id;

        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(id.toHexString());
        }).end(done);
    });

    it('should return 404 when id is not found',(done)=>{

        var id = new ObjectID();

        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 when the Object ID is not availale',(done)=>{
        var id = "invalid_id";
        
        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

});

describe('PATCH /todos/:id',()=>{
    var id = todos[0]._id;
    var text = "";

    it('should update a record if found and valid',(done)=>{
        request(app)
        .patch(`/todos/${id}`)
        .send({text,completed:true})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completedAt).toBeA('number');
        }).end(done);
    });

    it('should clear completedAt when the completed is set to false',(done)=>{
        var id = todos[1]._id;

        request(app)
        .patch(`/todos/${id}`)
        .send({completed: false})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBe(null);
        }).end(done);
    });

    it('should return 404 when the id is invalid',(done)=>{
        var id ="invalid_id";

        request(app)
        .patch(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 when the id is valid but not found',(done)=>{
        var id = new ObjectID();

        request(app)
        .patch(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
});