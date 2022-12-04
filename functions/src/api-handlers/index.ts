import { db, admin } from '../config/firebase'

export const createUser = async (req, res) => {
  const { firstName, lastName, emailAddress, country, about, photoUrl } = req.body
  try {
    const userId = req.userId
    const userEntry = db.collection('users').doc(userId)
    const userRecord = {
      id: userId,
      firstName,
      lastName,
      emailAddress,
      country,
      about,
      photoUrl,
      timestamp: admin.firestore.Timestamp.fromDate(new Date())
    }

    userEntry.set(userRecord)
    res.status(200).send({
      status: 'success',
      data: userRecord
    })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}
