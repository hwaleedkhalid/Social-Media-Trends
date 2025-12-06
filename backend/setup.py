#!/usr/bin/env python3
"""
Setup script for Social Media Dashboard API
Installs required dependencies and downloads NLTK data
"""

import subprocess
import sys
import os

def run_command(command, description):
    print(f"\n{'='*60}")
    print(f"Step: {description}")
    print(f"Command: {command}")
    print('='*60)
    
    try:
        if isinstance(command, list):
            result = subprocess.run(command, check=True, capture_output=True, text=True)
        else:
            result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        
        if result.stdout:
            print(f"Output: {result.stdout}")
        if result.stderr:
            print(f"Errors/Warnings: {result.stderr}")
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
        print(f"Stderr: {e.stderr}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

def check_python_version():
    """Check Python version"""
    if sys.version_info < (3, 8):
        print("Error: Python 3.8 or higher is required")
        return False
    print(f"✓ Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro} detected")
    return True

def install_dependencies():
    """Install required packages from requirements.txt"""
    if not os.path.exists('requirements.txt'):
        print("Error: requirements.txt not found")
        return False
    
    return run_command(
        [sys.executable, "-m", "pip", "install", "-r", "requirements.txt"],
        "Installing dependencies from requirements.txt"
    )

def download_nltk_data():
    """Download required NLTK data for TextBlob"""
    import nltk
    
    required_data = [
        'punkt',
        'averaged_perceptron_tagger',
        'punkt_tab'
    ]
    
    print(f"\n{'='*60}")
    print("Downloading NLTK data for TextBlob")
    print('='*60)
    
    for data in required_data:
        try:
            print(f"Downloading {data}...")
            nltk.download(data, quiet=False)
            print(f"✓ Downloaded {data}")
        except Exception as e:
            print(f"✗ Failed to download {data}: {e}")
    
    return True

def create_env_file():
    """Create .env file if it doesn't exist"""
    if not os.path.exists('.env'):
        print("\nCreating .env file from template...")
        try:
            with open('.env.example', 'r') as f:
                template = f.read()
            
            with open('.env', 'w') as f:
                f.write(template)
            
            print("✓ Created .env file")
            print("Please edit .env file to configure your settings")
        except Exception as e:
            print(f"✗ Failed to create .env file: {e}")
            return False
    else:
        print("✓ .env file already exists")
    
    return True

def test_imports():
    """Test if all required modules can be imported"""
    print(f"\n{'='*60}")
    print("Testing module imports")
    print('='*60)
    
    modules_to_test = [
        'fastapi',
        'uvicorn',
        'websockets',
        'pandas',
        'requests',
        'textblob',
        'pydantic',
        'tweepy',
        'hdfs',
        'dotenv',
        'nltk'
    ]
    
    all_good = True
    for module in modules_to_test:
        try:
            __import__(module)
            print(f"✓ {module}")
        except ImportError as e:
            print(f"✗ {module}: {e}")
            all_good = False
    
    return all_good

def main():
    print("=" * 60)
    print("Social Media Dashboard API - Setup Script")
    print("=" * 60)
    
    steps = [
        ("Checking Python version", check_python_version),
        ("Installing dependencies", install_dependencies),
        ("Testing imports", test_imports),
        ("Downloading NLTK data", download_nltk_data),
        ("Creating environment file", create_env_file),
    ]
    
    for step_name, step_func in steps:
        print(f"\n{'='*60}")
        print(f"Executing: {step_name}")
        print('='*60)
        
        if not step_func():
            print(f"\n✗ Failed at step: {step_name}")
            print("Please fix the issue and run the script again")
            return False
    
    print("\n" + "=" * 60)
    print("✓ Setup completed successfully!")
    print("\nTo start the application:")
    print("1. Edit .env file to configure your settings")
    print("2. Run: python main.py")
    print("3. Or run: uvicorn main:app --reload")
    print("=" * 60)
    
    return True

if __name__ == "__main__":
    if main():
        sys.exit(0)
    else:
        sys.exit(1)