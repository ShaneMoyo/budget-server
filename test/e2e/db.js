import connect from '../../lib/connect';
import mongoose from 'mongoose';
const url = 'mongodb://localhost:27017/budget';

before(()=> connect(url));
after(()=> mongoose.connection.close());
