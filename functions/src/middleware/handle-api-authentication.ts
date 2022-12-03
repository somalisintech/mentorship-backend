import { admin } from '../config/firebase'

const getAuthToken = (req: any): string | undefined => {
  const authenticationHeader: string | undefined = req.headers['authorization']
  if (!authenticationHeader) return

  return authenticationHeader.split(' ')[0] === 'Bearer' ? authenticationHeader.split('Bearer ')[1] : undefined
}

export const authenticateUser = async (req: any) => {
  try {
    const userIdPath = req.openapi.pathParams.userId
    const authToken = getAuthToken(req)
    if (!authToken) return false

    const userInfo = await admin.auth().verifyIdToken(authToken)

    // if accessing a user resource, check the resource belongs to the logged in user
    if (userIdPath && userIdPath !== userInfo.uid) {
      return false
    }

    req.userId = userInfo.uid
    return true
  } catch (error: any) {
    return false
  }
}
