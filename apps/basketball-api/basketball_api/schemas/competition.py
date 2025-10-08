from pydantic import BaseModel, ConfigDict
from humps import decamelize

class Competition(BaseModel):
    model_config = ConfigDict(
        alias_generator=decamelize,
        populate_by_name=True,
        from_attributes=True
    )
    id: int
    name: str