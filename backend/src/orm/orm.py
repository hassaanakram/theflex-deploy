from sqlalchemy import Column, BigInteger, String, Text, Boolean, DECIMAL, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Review(Base):
    __tablename__ = "Reviews"

    Id = Column(BigInteger, primary_key=True, autoincrement=False)
    listingId = Column(BigInteger, nullable=False)
    listingName = Column(String(255), nullable=False)
    guest = Column(String(255), nullable=False)
    category = Column(String(100), nullable=True)
    rating = Column(DECIMAL(3, 1), nullable=True)   # 0–10 scale
    publicReview = Column(Text, nullable=True)
    submittedAt = Column(TIMESTAMP, server_default=func.now())
    channel = Column(String(100), nullable=True)
    isPublic = Column(Boolean, default=True)