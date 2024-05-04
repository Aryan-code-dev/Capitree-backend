const express = require('express');
var cors = require('cors');
const app = express();
const Node = require('./src/models/nodes');
const Edge = require('./src/models/edges');
const User = require('./src/models/users');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = process.env.PORT || 3001;

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server({
    cors: {
      origin: "http://localhost:3000"
    }
  });
  

app.use('/load',require('./src/routes/load'));

app.use('/login',require('./src/routes/login'));
app.use('/register',require('./src/routes/register'));

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
    }
);

io.on('connection', (socket) => {
    console.log('a user connected: ',socket.id);

    socket.on("AddNode", async (newNode,owner) => {
        let node = await Node.create({nodeId: newNode.id, owner: owner,type:newNode.type,returnType: newNode.data.returnType,label: newNode.data.label, height: newNode.height, width: newNode.width, x: newNode.position.x, y: newNode.position.y})
        socket.broadcast.emit("AddNode",newNode);
    });

    socket.on("AddEdge", async (e,owner) => {
        let edge = await Edge.create({edgeId: e.id, owner: owner, type:e.type, label: e.label, source: e.source, target: e.target})
        socket.broadcast.emit("AddEdge",e);
    });

    socket.on("MoveNode", async (node,owner) => {
        const filter = { nodeId: node.id, owner: owner};
        const update = { type:node.type,returnType: node.data.returnType, label: node.data.label, height: node.height, width: node.width, x: node.position.x, y: node.position.y};
        let upnode = await Node.updateOne(filter,update);
        socket.broadcast.emit("MoveNode",node)
    });

    socket.on("DeleteNode", async (node, owner) => {
       
        try {
            await Node.findOneAndDelete({ nodeId: node[0].id, owner: owner });
            let deletedNode = node[0];
            socket.broadcast.emit("DeleteNode",deletedNode);
            console.log("Node deleted successfully");
        } catch (error) {
            console.error("Error deleting node:", error);
        }
    });
    

    socket.on("DeleteEdge", async (edge,owner) => {
       
        try {
            await Edge.findOneAndDelete({ edgeId: edge[0].id, owner: owner });
            let deletedEdge = edge[0];
            socket.broadcast.emit("DeleteEdge",deletedEdge);
            console.log("Edge deleted successfully");
        } catch (error) {
            console.error("Error deleting edge:", error);
        }
    });

    // socket.on("hello", (arg) => {
    // console.log(arg); // world
    // });

  });

io.listen(4000);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

