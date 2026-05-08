from openai import OpenAI
from dotenv import load_dotenv
import base64
import os

load_dotenv()

api_key = os.getenv("YOUR_OPENROUTER_API_KEY")

client = OpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1"
)

def analyze_image(image_path):

    with open(image_path, "rb") as img:
        base64_image = base64.b64encode(img.read()).decode("utf-8")

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """
                        Analyze this clothing item.

                        Return:
                        - category
                        - color
                        - condition
                        - visible defects
                        - style
                        """
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ]
    )

    return response.choices[0].message.content