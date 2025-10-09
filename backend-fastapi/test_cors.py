#!/usr/bin/env python3
"""
Test script to verify the CORS configuration is correct.

This script checks that:
1. The FastAPI app can be imported without errors
2. CORS middleware is properly configured
3. No wildcard origin ("*") is present when allow_credentials is True
4. Only specific trusted origins are allowed
"""

import sys
from main import app

def test_cors_configuration():
    """Test that CORS middleware is configured correctly"""
    
    print("=" * 60)
    print("CORS Configuration Test")
    print("=" * 60)
    
    # Find CORS middleware
    cors_middleware = None
    for middleware in app.user_middleware:
        if hasattr(middleware, 'cls') and middleware.cls.__name__ == 'CORSMiddleware':
            cors_middleware = middleware
            break
    
    if not cors_middleware:
        print("❌ FAIL: CORS middleware not found!")
        return False
    
    print("✅ PASS: CORS middleware found")
    
    # Get configuration
    kwargs = cors_middleware.kwargs
    allow_origins = kwargs.get('allow_origins', [])
    allow_credentials = kwargs.get('allow_credentials', False)
    allow_methods = kwargs.get('allow_methods', [])
    allow_headers = kwargs.get('allow_headers', [])
    
    print("\nConfiguration:")
    print(f"  allow_origins: {allow_origins}")
    print(f"  allow_credentials: {allow_credentials}")
    print(f"  allow_methods: {allow_methods}")
    print(f"  allow_headers: {allow_headers}")
    
    # Run tests
    tests_passed = 0
    tests_total = 0
    
    # Test 1: allow_credentials should be True
    tests_total += 1
    if allow_credentials == True:
        print("✅ PASS: allow_credentials is True")
        tests_passed += 1
    else:
        print("❌ FAIL: allow_credentials should be True")
    
    # Test 2: Production origin should be present
    tests_total += 1
    if "https://www.alazie.express" in allow_origins:
        print("✅ PASS: Production origin (https://www.alazie.express) is present")
        tests_passed += 1
    else:
        print("❌ FAIL: Production origin missing")
    
    # Test 3: Development origin should be present
    tests_total += 1
    if "http://localhost:3000" in allow_origins:
        print("✅ PASS: Development origin (http://localhost:3000) is present")
        tests_passed += 1
    else:
        print("❌ FAIL: Development origin missing")
    
    # Test 4: Wildcard origin should NOT be present
    tests_total += 1
    if "*" not in allow_origins:
        print("✅ PASS: No wildcard origin (*) present (correct for allow_credentials=True)")
        tests_passed += 1
    else:
        print("❌ FAIL: Wildcard origin (*) should not be present when allow_credentials=True")
    
    # Test 5: allow_methods should be ["*"]
    tests_total += 1
    if allow_methods == ["*"]:
        print("✅ PASS: allow_methods is [\"*\"]")
        tests_passed += 1
    else:
        print("❌ FAIL: allow_methods should be [\"*\"]")
    
    # Test 6: allow_headers should be ["*"]
    tests_total += 1
    if allow_headers == ["*"]:
        print("✅ PASS: allow_headers is [\"*\"]")
        tests_passed += 1
    else:
        print("❌ FAIL: allow_headers should be [\"*\"]")
    
    print("\n" + "=" * 60)
    print(f"Results: {tests_passed}/{tests_total} tests passed")
    print("=" * 60)
    
    if tests_passed == tests_total:
        print("\n🎉 All tests passed! CORS configuration is correct and secure.")
        return True
    else:
        print(f"\n❌ {tests_total - tests_passed} test(s) failed.")
        return False

if __name__ == "__main__":
    success = test_cors_configuration()
    sys.exit(0 if success else 1)
