import  mongoose  from 'mongoose';
export const dbConnection = async () => {
  return await mongoose.connect(process.env.MONGODB_URI).then(() => {

    console.log("connection done database");
  });
};
