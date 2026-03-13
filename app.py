from flask import Flask, request, redirect, url_for

app = Flask(__name__)

# A simple variable to store the name in memory
stored_name = ""

@app.route('/')
def index():
    # Serves the initial form
    return '''
        <form action="/submit" method="POST">
            <input type="text" name="username" placeholder="Name">
            <button type="submit">Submit</button>
        </form>
    '''

@app.route('/submit', methods=['POST'])
def submit():
    global stored_name
    # 1. Take in the name using POST
    stored_name = request.form.get('username')
    # 2. Redirect to the display page (GET request)
    return redirect(url_for('greet_user'))

@app.route('/greet')
def greet_user():
    # 3. Display the name using GET
    return f"Hello, {stored_name}!"

if __name__ == '__main__':
    app.run(debug=True)