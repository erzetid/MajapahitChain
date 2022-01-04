import Server from './src/connection/Server';
import Network from './src/service/Network';

const myNode = new Network();
const app = new Server(myNode.getMyNode());
app.listen(3005);
