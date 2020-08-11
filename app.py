import pandas as pd
from flask import Flask, render_template, redirect, request, jsonify
from sqlalchemy import create_engine, func
from config import remote_db_endpoint, remote_db_port, remote_db_user, remote_db_pwd, remote_db_name

app = Flask(__name__)

# cloud_engine = create_engine("postgresql://postgres:thelog89@ssa-ckh.c7biawpsnxhf.us-east-2.rds.amazonaws.com:5432/ssa-ckh")
cloud_engine = create_engine(f"postgresql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")


#Map/DashBoard
@app.route("/")
def home():
    return render_template("index.html")

#Foreign Direct Investment
@app.route("/fdi")
def fdi_data():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM fdi'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Political Stability - Gauge/Scatter
@app.route("/stability")
def psi_data():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM stability'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Corruption Index - Gauge/Scatter
@app.route("/corruption")
def ci_data():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM corruption'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Education Index
@app.route("/education")
def ed_data():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM education'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Gross Domestic Product
@app.route("/gdp")
def gdp_data():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM gdp'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Human Development Index
@app.route("/humandev")
def human_data():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM humandev'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Life Expectancy
@app.route("/life")
def life_data():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM life'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Gross National Income
@app.route("/gni")
def gni():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM gni'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#GDP per Capita
@app.route("/gdp_pc")
def gdp_pc():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM gdp_pc'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Life Expectancy Aggregates
@app.route("/life_agg")
def life_agg():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM life_agg'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json

#Health Costs as a % of GDP
@app.route("/healthcare")
def healthcare():
    conn = cloud_engine.connect()
    query = 'SELECT * FROM health_gdp'
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')
    conn.close()
    return results_json



if __name__ == '__main__':
    app.run(debug=True)