const jwt = require('jsonwebtoken');
const token = jwt.sign({ name: 'react' }, 'asdfghjk');
try {
  let decoded = jwt.verify(token, 'asdfghjk'); // 프론트엔드에서는 거의 verify만 사용한다.
  console.log(decoded);
} catch (err) {
  console.log(err);
}
