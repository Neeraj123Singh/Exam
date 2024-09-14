module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    questionId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    answerText: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    answerImageUrl: { 
      type: DataTypes.STRING, 
      allowNull: true 
    }
  }, {
    timestamps: true
  });

  return Answer;
};
