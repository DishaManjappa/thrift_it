def suggest_price(condition):
    condition = condition.lower()

    if "excellent" in condition:
        return "$42"

    if "good" in condition:
        return "$32"

    if "fair" in condition:
        return "$22"

    return "$18"
