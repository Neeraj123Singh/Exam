module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionType: { 
      type: DataTypes.ENUM('MCQ', 'Descriptive'), 
      allowNull: false 
    },
    questionText: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    answer: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    imageUrl: { 
      type: DataTypes.STRING 
    },
    options: { 
      type: DataTypes.JSON, // For storing MCQ options
      allowNull: true
    }
  }, {
    timestamps: true
  });

  return Question;
};
