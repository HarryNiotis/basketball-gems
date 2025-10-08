from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from . import models, schemas
from .database import engine, get_db
from .models import Team, Competition

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to Basketball API"}

@app.get("/teams/", response_model=list[schemas.Team])
def read_teams(db: Session = Depends(get_db)):
    teams = db.query(Team).all()
    return teams

@app.get("/competitions/", response_model=list[schemas.Competition])
def read_competitions(db: Session = Depends(get_db)):
    teams = db.query(Competition).all()
    return teams