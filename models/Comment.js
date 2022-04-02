const { ExtendedModel } = require('./ExtendedModel')

class Comment extends ExtendedModel {
  static tableName = 'comments'
  static modelName = 'Comment'
}

Comment.init(Comment.defineColumns(), Comment.defineTable())

module.exports = Comment