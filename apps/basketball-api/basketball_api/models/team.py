from sqlalchemy import Column, Integer, String
from .base import Base

class Team(Base):
    __tablename__ = "Teams"

    id = Column("Id", Integer, primary_key=True, index=True)
    name = Column("Name", String)
    code = Column("Code", String)