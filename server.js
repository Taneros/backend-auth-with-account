const express = require('express');
const app = express();
const authRoutes = require( './routes/authRoutes' );
const sessionMiddleware = require('./middleware/sessionMiddleware');

app.use( express.json() );
app.use(sessionMiddleware);
app.use('/auth', authRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
