


export const isAdmin = (req, res, next) => {
    const {role_code} = req.user
    if(role_code !== '1') {
        return res.status(401).json({message: "Require role Admin"})
    }
}

export const isModerator = (req, res, next) => {
    const {role_code} = req.user
    if(role_code !== '1' && role_code !== '2') {
        return res.status(401).json({message: "Require role Admin or Moderator"})
    }
}