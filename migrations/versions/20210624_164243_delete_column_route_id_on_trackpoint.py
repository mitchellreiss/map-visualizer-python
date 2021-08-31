"""delete column route_id on trackpoint

Revision ID: 50ee69d473b3
Revises: fd0a6411cfc6
Create Date: 2021-06-24 16:42:43.365544

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50ee69d473b3'
down_revision = 'fd0a6411cfc6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('track_points_route_id_fkey', 'track_points', type_='foreignkey')
    op.drop_column('track_points', 'route_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('track_points', sa.Column('route_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('track_points_route_id_fkey', 'track_points', 'routes', ['route_id'], ['id'])
    # ### end Alembic commands ###
