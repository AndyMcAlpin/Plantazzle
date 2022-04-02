const { ExtendedModel } = require('./ExtendedModel')

class Vote extends ExtendedModel {
  static modelName = 'Vote'
  static tableName = 'votes'

  static countVote(CommentId) {
    return this.sum('upvote', { where: { CommentId },  })
  }
}

Vote.init(Vote.defineColumns(), Vote.defineTable())

module.exports = Vote