class User:
    def __init__(self, id, username):
        self.id = id
        self.username = username

class Challenge:
    def __init__(self, user_id, balance=5000):
        self.user_id = user_id
        self.balance = balance
        self.status = "active" # active, failed, passed

class Trade:
    def __init__(self, symbol, type, profit):
        self.symbol = symbol # IAM ou BTC
        self.type = type     # BUY/SELL
        self.profit = profit