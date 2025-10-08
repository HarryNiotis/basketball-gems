from sqlalchemy import Column, Integer, String
from ..database import Base

class Competition(Base):
    __tablename__ = "Competitions"

    id = Column("Id", Integer, primary_key=True, index=True)
    name = Column("Name", String)