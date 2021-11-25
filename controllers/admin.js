const Booking = require('../MongoModels/booking');

const bookingData = async (req, res) => {

    const aggregate = [
        {
          $group: {
            _id: {
              year: {
                $year: "$start_date"
              },
              week: {
                $week: "$start_date"
              }
            },
            start_date: {
              $first: "$start_date"
            },
            count: {
              $sum: 1
            }
          }
        }
      ]
    
    const data = await Booking
                            .aggregate(aggregate)

    return res.status(200).send(data);

    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                jwt.sign({ nim: user.nim, role: user.role }, process.env.JWT_SECRET, function (err, token) {
                    if (token) return res.json({ token: token })
                    else return res.status(500).send('jwt error');
                })

            }
            else {
                return res.status(401).send('Wrong Credentials')
            }
        });
    } else {
        return res.status(401).send('Invalid Credentials')
    }
}

module.exports = {
    bookingData
}